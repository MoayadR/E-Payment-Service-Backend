import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { IRefreshTokenSymbol } from './interfaces/refreshToken.interface';
import { RefreshTokenRepository } from './repos/refreshToken.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refreshToken.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { EmailVerification } from './entities/emailVerfication.entity';
import { IEmailVerificationToken } from './interfaces/emailVerficationInterface';
import { EmailVerficationRepository } from './repos/emailVerfication.repo';
import { IPasswordHasherToken, PasswordHasher } from './utils/bcrypt';

@Module({
  controllers: [AuthController, ],
  providers: [AuthService , LocalStrategy , JwtStrategy , {provide:IRefreshTokenSymbol, useClass:RefreshTokenRepository} , 
    {provide:IEmailVerificationToken, useClass:EmailVerficationRepository},
  {provide:IPasswordHasherToken , useClass:PasswordHasher}],
  imports: [
    TypeOrmModule.forFeature([UserEntity,RefreshToken , EmailVerification]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret:"SECRET_KEY_FOR_JWT",
      signOptions:{expiresIn:"2h"}
  }),
],
})
export class AuthModule {}
