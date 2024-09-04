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
import { IPasswordHasherToken, PasswordHasher } from './utils/bcrypt';
import { EmailModule } from 'src/email/email.module';

@Module({
  controllers: [AuthController, ],
  providers: [AuthService , LocalStrategy , JwtStrategy , {provide:IRefreshTokenSymbol, useClass:RefreshTokenRepository},
  {provide:IPasswordHasherToken , useClass:PasswordHasher}],
  imports: [
    TypeOrmModule.forFeature([UserEntity,RefreshToken]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret:"SECRET_KEY_FOR_JWT",
      signOptions:{expiresIn:"2h"}
  }),
  EmailModule,
],
})
export class AuthModule {}
