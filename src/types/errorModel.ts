export class ValidationErrorData {
  errorData: ValidationError;
  constructor(errorData: ValidationError) {
    this.errorData = errorData;
  }
}

export class Unauthorized {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

export class ProcessError {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

export class NotFound {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

export class CountdownError {
  message: string;
  secondsElapsed: number;
  constructor(message: string, secondsElapsed: number) {
    this.message = message;
    this.secondsElapsed = secondsElapsed;
  }
}

export class NotMember {
  message: string;
  comunSlug: string;

  constructor(message: string, comunSlug: string) {
    this.message = message;
    this.comunSlug = comunSlug;
  }
}

export class Aborted {}

export class InternalServerError {}
