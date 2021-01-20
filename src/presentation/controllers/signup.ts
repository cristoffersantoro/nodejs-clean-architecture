import { HttpRequest, HttpResponse, EmailValidator, Controller } from '../protocols'
import { MissingParameterError, InvalidParameterError } from '../error'
import { badRequest, serverError } from '../helpers/http-helper'
import { AddAccount } from '../../domain/useCases/add-account'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse | undefined {
    try {
      const requiredFields = ['name', 'email','password','passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) { return badRequest(new MissingParameterError(field)) }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParameterError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return badRequest(new InvalidParameterError('email'))
      }

      this.addAccount.add({
        name,
        email,
        password
      })
    } catch (error) {
      return serverError()
    }
  }
}
