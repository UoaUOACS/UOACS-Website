import { spawn } from "node:child_process"
import fs from "node:fs/promises"
import os from "node:os"
import path from "node:path"

const TARGET_SIZE_BYTES = 9 * 1024 * 1024 // 9MB
const AUDIO_BITRATE_KBPS = 128

export async function compressVideo(inputBuffer: Buffer): Promise<Buffer> {
  if (inputBuffer.length <= TARGET_SIZE_BYTES) return inputBuffer

  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "uoacs-video-"))
  const inputPath = path.join(tmpDir, "input.mp4")
  const outputPath = path.join(tmpDir, "output.mp4")

  try {
    await fs.writeFile(inputPath, inputBuffer)

    const duration = await getVideoDuration(inputPath)
    const targetBitrateKbps =
      Math.floor((TARGET_SIZE_BYTES * 8) / 1024 / duration) - AUDIO_BITRATE_KBPS

    await twoPassEncode(inputPath, outputPath, targetBitrateKbps, tmpDir)

    return await fs.readFile(outputPath)
  } finally {
    await fs.rm(tmpDir, { recursive: true, force: true })
  }
}

async function getVideoDuration(filePath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const proc = spawn("ffprobe", [
      "-v",
      "error",
      "-show_entries",
      "format=duration",
      "-of",
      "default=noprint_wrappers=1:nokey=1",
      filePath,
    ])
    let stdout = ""
    let stderr = ""
    proc.stdout.on("data", (chunk) => {
      stdout += chunk
    })
    proc.stderr.on("data", (chunk) => {
      stderr += chunk
    })
    proc.on("close", (code) => {
      if (code !== 0) return reject(new Error(`ffprobe exited ${code}: ${stderr}`))
      const duration = Number.parseFloat(stdout.trim())
      if (!Number.isFinite(duration)) return reject(new Error("Could not determine video duration"))
      resolve(duration)
    })
  })
}

async function runFfmpeg(args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn("ffmpeg", args)
    let stderr = ""
    proc.stderr.on("data", (chunk) => {
      stderr += chunk
    })
    proc.on("close", (code) => {
      if (code !== 0) return reject(new Error(`ffmpeg exited ${code}: ${stderr}`))
      resolve()
    })
  })
}

async function twoPassEncode(
  input: string,
  output: string,
  videoBitrateKbps: number,
  passlogDir: string,
): Promise<void> {
  const passlogPrefix = path.join(passlogDir, "ffmpeg2pass")
  await runFfmpeg([
    "-i",
    input,
    "-c:v",
    "libx264",
    "-b:v",
    `${videoBitrateKbps}k`,
    "-pass",
    "1",
    "-passlogfile",
    passlogPrefix,
    "-an",
    "-f",
    "null",
    "/dev/null",
  ])
  await runFfmpeg([
    "-i",
    input,
    "-c:v",
    "libx264",
    "-b:v",
    `${videoBitrateKbps}k`,
    "-pass",
    "2",
    "-passlogfile",
    passlogPrefix,
    "-c:a",
    "aac",
    "-b:a",
    `${AUDIO_BITRATE_KBPS}k`,
    output,
  ])
}
