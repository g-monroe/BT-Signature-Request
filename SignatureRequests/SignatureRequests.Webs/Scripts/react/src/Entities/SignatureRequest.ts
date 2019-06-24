
class SignatureRequest {
  imagePath: string;
  certificatePath: string;
  certificatePassword: string;
  location?: string;
  reason?: string;
  contactInfo?: string;
  isInitial: boolean;
  userId: number;
  expirationDate?: Date;

  constructor(data: any) {
    this.imagePath = data.ImagePath;
    this.certificatePath = data.CertificatePath;
    this.certificatePassword = data.CertificatePassword;
    this.location = data.Location;
    this.reason = data.Reason;
    this.contactInfo = data.ContactInfo;
    this.isInitial = data.isInitial;
    this.userId = data.UserId;
    this.expirationDate = data.ExpirationDate;
  }
}

export default SignatureRequest;