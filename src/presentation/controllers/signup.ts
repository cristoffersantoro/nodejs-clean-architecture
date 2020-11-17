import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParameterError } from '../error/missing-param-error'
import { badRequest } from '../helpers/http-helper'
export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse | undefined {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParameterError('name'))
    }
    if (!httpRequest.body.email) {
      return badRequest(new MissingParameterError('email'))
    }
  }
}
