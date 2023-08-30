import React, { useEffect, useState } from "react";
import { AvatarGenerator } from "random-avatar-generator";
import { faker } from '@faker-js/faker';

export default function HelloUser() {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const generator = new AvatarGenerator();
    const avatar = generator.generateRandomAvatar();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName);

    setUser({
      avatar,
      firstName,
      lastName,
      email,
    });
  }, []);

  return (
    <div>
      <img src={user.avatar} alt="User avatar" />
      <h1>Hello, {user.firstName}!</h1>
      <p>
        Your email address is <strong>{user.email}</strong>.
      </p>
    </div>
  );
}