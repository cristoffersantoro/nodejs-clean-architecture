import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParameterError } from '../error/missing-param-error'
import { badRequest } from '../helpers/http-helper'
export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse | undefined {
    const requiredFields = ['name', 'email','password']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) { return badRequest(new MissingParameterError(field)) }
    }
  }
}
