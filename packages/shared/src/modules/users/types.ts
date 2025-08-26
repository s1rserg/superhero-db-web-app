export type Role = 'viewer' | 'creator';

export type UserDto = {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
};

export type SignInRequestDto = {
  email: string;
  password: string;
};

export type SignUpRequestDto = {
  name: string;
  email: string;
  role: Role;
  password: string;
};

export type AuthResponseDto = {
  token: string;
  user: UserDto;
};
