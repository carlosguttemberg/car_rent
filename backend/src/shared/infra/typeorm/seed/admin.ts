import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuidV4();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "is_admin", created_at, driver_license)
     values('${id}', 'admin', 'admin@admin.com', '${password}', true, 'now()', 'XXX-XXX')
    `
  );

  await connection.close;
}

create().then(() => {
  console.log("User created");
});
