import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto'; 
import { UserRegistrationDto } from './register.dto';
import { UserLoginDto } from './login-institution.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthDto)
  async registerUser(
    @Args('registerInstitutionDto') userRegistrationDto: UserRegistrationDto,
  ): Promise<AuthDto> {
    return this.authService.registerUser(userRegistrationDto);
  }


  @Mutation(() => AuthDto)
  async login(
    @Args('loginDto') loginDto: UserLoginDto,
  ): Promise<AuthDto> {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(user);
  }

}
