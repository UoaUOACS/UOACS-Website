export const passwordsMatch = (data: { password: string; confirmPassword: string }) =>
  data.password === data.confirmPassword

export const passwordMismatchIssue = {
  message: "Passwords do not match",
  path: ["confirmPassword"],
}
