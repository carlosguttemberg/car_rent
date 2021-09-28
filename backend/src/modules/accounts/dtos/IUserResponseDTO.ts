interface IUserResponseDTO {
  email: string;
  name: string;
  avatar: string;
  id: string;
  driver_license: string;
  avatar_url(): string;
}

export { IUserResponseDTO };
