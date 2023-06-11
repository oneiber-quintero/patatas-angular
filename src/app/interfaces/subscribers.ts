
export interface ParamsRequest {
  criteria?: string;
  page?: number;
  count?: number;
  sortOrder?: string;
  sortType?: number;
}

export interface SubscriberResponse {
  SystemId: string
  Area: string;
  PublicId: number
  CountryCode: string;
  CountryName: string;
  Name: string;
  EndpointsCount: number
  Email: string;
  JobTitle: string;
  PhoneNumber: string;
  PhoneCode: string;
  PhoneCodeAndNumber: string;
  LastActivityUtc: string;
  LastActivity: string;
  LastActivityString: string;
  SubscriptionDate: string;
  SubscriptionMethod: number;
  SubscriptionState: number;
  SubscriptionStateDescription: string;
  Topics: any;
  ValidEmail: boolean;
  Activity: string;
  ConnectionState: number;
  Id: number;
}


export interface Subscribers {
  Data: SubscriberResponse[]
}

export interface SubscriberList {
  Name: string;
  Email: string;
  CountryCode: string;
  PhoneNumber: string;
  JobTitle: string;
  Area: string;
  Topics: any[];
}

export interface SubscriberRequest {
  Name: string;
  Email: string;
  CountryCode: string;
  PhoneNumber: string;
  JobTitle: string;
  Area: string;
  Topics: any[];
}


export interface CountryResponse {
  Code: string;
  Code3: string;
  Name: string;
  PhoneCode: string;
}

export interface Country {
  code: string;
  name: string;
}

