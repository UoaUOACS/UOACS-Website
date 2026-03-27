import { spawn } from "node:child_process"
import fs from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import { UPLOAD_SIZE_LIMIT_BYTES } from "./constants"

const VIDEO_BITRATE_KBPS = 2000

export async function compressVideo(inputBuffer: Buffer): Promise<Buffer> {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "uoacs-video-"))
  const rawPath = path.join(tmpDir, "raw.mp4")
  const sourcePath = path.join(tmpDir, "source.mp4")
  const outputPath = path.join(tmpDir, "output.mp4")

  try {
    await fs.writeFile(rawPath, inputBuffer)
    await runFfprobe(rawPath)
    // Normalize to a faststart MP4 so single-pass encoding can read container
    // metadata reliably. Fall back to a full transcode if the copy remux fails
    // (e.g. unsupported codec or minor container errors).
    try {
      await runFfmpeg([
        "-analyzeduration",
        "100M",
        "-i",
        rawPath,
        "-c",
        "copy",
        "-movflags",
        "faststart",
        sourcePath,
      ])
    } catch {
      await runFfmpeg([
        "-probesize",
        "100M",
        "-analyzeduration",
        "100M",
        "-fflags",
        "+genpts+discardcorrupt",
        "-err_detect",
        "ignore_err",
        "-i",
        rawPath,
        "-c:v",
        "libx264",
        "-an",
        "-movflags",
        "faststart",
        sourcePath,
      ])
    }

    let bitrateKbps = VIDEO_BITRATE_KBPS
    while (true) {
      await runFfmpeg([
        "-i",
        sourcePath,
        "-c:v",
        "libx264",
        "-b:v",
        `${bitrateKbps}k`,
        "-an",
        outputPath,
      ])
      const { size } = await fs.stat(outputPath)
      if (size <= UPLOAD_SIZE_LIMIT_BYTES) break
      bitrateKbps = Math.floor(bitrateKbps / 2)
      await fs.rm(outputPath, { force: true })
    }

    return await fs.readFile(outputPath)
  } finally {
    await fs.rm(tmpDir, { recursive: true, force: true })
  }
}

async function runFfprobe(inputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn("ffprobe", ["-v", "error", inputPath])
    let stderr = ""
    proc.stderr.on("data", (chunk) => {
      stderr += chunk
    })
    proc.on("close", (code) => {
      if (code !== 0) return reject(new Error(`ffprobe exited ${code}: ${stderr}`))
      resolve()
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
