import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthDto, VerificationDto, sendOtp, dummyloginDto } from './auth.dto'; 
import { UserRegistrationDto } from './register.dto';
import { UserLoginDto } from './login-institution.dto';
import { JwtService } from '@nestjs/jwt';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) {}

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

  // @Mutation(() => VerificationDto)
  // async otpVerifitcaion(
  //   @Args('verifitcaiondto') verifitcaiondto: VerificationDto,
  // ): Promise<AuthDto> {
  //   const user = await this.authService.validateOtp(verifitcaiondto.phone, verifitcaiondto.verificationCode);
  //   if (!user) {
  //     throw new Error('Otp Is Not Valid');
  //   }
  //   return this.authService.login(user);
  // }

  @Mutation(() => sendOtp)
  async sendOtp(@Args('phone') phone: string): Promise<sendOtp> {
    const user = await this.authService.sendOtp({ phone });
    if (!user) {
      throw new Error('Otp sending failed');
    }
    return ({  phone: 'Otp sent' });
  }
  
  @Mutation(() => dummyloginDto)
  async dummyLogin() {
    const payload = { id: 1 , name: "numaan" , password : "numaan"};
    // if (dummyloginDto.name === "numaan" && dummyloginDto.password === "numaan") {
      const accessToken = this.jwtService.sign(payload, { expiresIn: '1y' });
      console.log(accessToken);
    // }
    return accessToken;
  }

}
