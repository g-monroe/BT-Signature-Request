import UserEntity from "./UserEntity";

class SignatureEntity {
  id: number;
  imagePath: string;
  certificatePath: string;
  certificatePassword: string;
  location?: string;
  reason?: string;
  contactInfo?: string;
  isInitial: boolean;
  user: UserEntity;
  expirationDate?: Date;

  constructor(data: any) {
    this.id = data.Id;
    this.imagePath = data.ImagePath;
    this.certificatePath = data.CertificatePath;
    this.certificatePassword = data.CertificatePassword;
    this.location = data.Location;
    this.reason = data.Reason;
    this.contactInfo = data.ContactInfo;
    this.isInitial = data.isInitial;
    this.user = data.User;
    this.expirationDate = data.ExpirationDate;
  }
}

export default SignatureEntity;