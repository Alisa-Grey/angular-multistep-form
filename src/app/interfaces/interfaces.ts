export interface IProfile {
  firstName: string;
  lastName: string;
  fullName: string;
  birthdate: string;
  age: number;
  height: number;
  weight: number;
  bmi: number;
  physicalActivity: string;
  goals: string[];
}

export interface IExpertFull {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  weebsite: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface IExpert {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  company: string;
}
