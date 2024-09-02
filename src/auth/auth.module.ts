import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService , LocalStrategy , JwtStrategy],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret:"SECRET_KEY_FOR_JWT",
      signOptions:{expiresIn:"2h"}
  }),
],
})
export class AuthModule {}
