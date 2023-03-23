export function genereteAuthError(message) {
  switch (message) {
    case "INVALID_PASSWORD":
      return "Email или пароль введены некорректно";
    case "EMAIL_EXISTS":
      return "Пользователь с таким Email уже существует";
    case "THIS_EMAIL_ALREADY_EXISTS":
      return "Этот email уже используется";
      case "THIS_USERNAME_ALREADY_USES":
        return "Это имя уже используется"
    default:
      return "Слишком много попыток входа. Попробуйте позднее";
  }
}
