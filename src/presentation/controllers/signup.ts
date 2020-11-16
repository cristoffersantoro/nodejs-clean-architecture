import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParameterError } from '../error/missing-param-error'
export class SignUpController{
  handle (httpRequest: HttpRequest): HttpResponse | undefined {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParameterError('name')
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParameterError('email')
      }
    }
  }
}
