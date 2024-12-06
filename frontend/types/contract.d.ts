declare interface Contract {
  id: number;
  title: string;
  description?: string;
  expiresAt: Date;
  lastTerminationDate: Date;
}

declare interface CreateContract {
  title: string;
  description?: string;
  expiresAt: Date;
  lastTerminationDate: Date;
}
