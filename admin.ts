const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const serviceAccount = {
  type: "service_account",
  project_id: "petsstuff-5f9e1",
  private_key_id: "88aaefeab8f355d5ca18cbf777c291808dc2e5be",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCmQyQXoXRv23/J\ndrzI3LiPbKJ8sVqR+LLMhT/0TJp2ee8+bn92SZ8yLvkjAHkaUf/QdNCvK0Zf1VUp\nJMjDPNI2e0WUcsk9golPxoutK8+rTByh4dMxF7LxiXOQ62ejHhatRc0Nm0gYvCUc\nYVnbEjnOyTo36bmcZHCE+ir+jy55xL0eQ5rK2mb72aGssiPU3ygnUQ93y59VStui\nnMkeZcvn1b4UC5SKHdgKcZ6w3PrQ9FPrpmaRvzHDSpJm+6RbEFXaNPrBmTVMdqkX\nLSHGnMiXNU3rX7eO0GQETcSqZAFzbRCrVWQUftmNm/cJATGBuGd0TRfZrpIz0Zqd\nW+T7hK1fAgMBAAECggEADmEYKgMIsvPk5WOjiCuuupjGpMoh7yX3MMEFevd1FHIP\nQvMDixNq9Ugiu+g6kRAuc7Tmp3+yom8s4lYQFvKXq6aVqfUTeoJjpcaiJeP4HfSD\nNWz2evR1wXYFzK7PU8gyZeH3jgmz/o+nFgFFaDD3Vu8IXfWU2/XD1XxdY462kklR\n2qqISE7BFRf/EhsyGhSRSY6AOOOwkjvBL393ACNL28Cae8XmLKDxDdXR/Rp3yRzh\ngUhmhN/SpezxD8VCkh6aM30IJI8SOamsSOAp7jW70h6MLWlkIW1pjdTN6/KJs0U5\n+MV/w6K8mpYaGkLOARLF0Cm3p7ylaOnkkUMi9AsNAQKBgQDdr6BX+NEf1RiNLtzQ\n6uCJ1NVehlKNgJOodkJo+x3Qz9lr+KDlA9gDlP096e+OwjxUjDBG8YDEJtN/1DkA\nOQNqkQjK44pB5o9OHc4rlVBVL+mmDiQ/zxbsbebb9KmHFnOg9VRo/5WLZ5pn60jd\nSdniRpkJ7miBd7uuP8FRYPv8vwKBgQC//1Tmjcn7pBX8Acu9RGLqSRkmOKiEpV36\neo0HczYYZ3TnIysBEfcqVENtHFxPK5hDYqCWoCNZqMTNtVfDanGIutgx9qoDziau\nJRI70kjtLWBUCckJxz4evDwaW7zAjz9MB7AE94fquU4hE2GZPLZIV9Gw/gyQCC0p\nd9A5TxtXYQKBgG14q9qlYUex6HTXnm2Afy8xLciG1j9QLhpzg6npz7hs23YpCfLt\nqf9i1Id9fTHnEvnBXJm76pVyguDOAPPuM5StWEUwhfazDzNJHqWBD3FxvpSkyRvF\nfRF12BnoQMsXuDPU0kEjbUqw95u3oXy9Wl4V9L7lvy+n28NZcnJoTSdrAoGAL2Om\nYQG+SQ5HHtySnTSz9X/1ZSm27oaim6CEDsKxJ3ThtetIQgtdJmWF/vhxEFmCS5+c\nY5FDKG4vpVaNQv6S51y24B4x+J55jaI4zespdOEuVY/Uv0UeYBe1/guGm0DALtP2\n7kLqmVUDo8ZU4K3LkC+c4kLSdvqNqx6Xlo2gAgECgYB99seN4+TRBGFi8Bv3EoA8\ncXeQ6841hzUpUbHjJlFPNc5QfZyHzRi1TnUTKB02NLwSu61tlCyFmqGzm3kXtdzV\nm64HTEnomVF9/HEgVoXI6ngVumvP0cfEonqe+KM7fn0ytMsrJKUsb7rGkrFmPsu0\nEUTw3QU4m2zB9s1VjJhKlg==\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-qfudh@petsstuff-5f9e1.iam.gserviceaccount.com",
  client_id: "106218286039505288863",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qfudh%40petsstuff-5f9e1.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();
const firestore = admin.firestore(); // Dodajte ovu liniju kako biste inicijalizovali Firestore

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/api/korisnici", async (req, res) => {
  try {
    const listUsersResult = await auth.listUsers();
    const korisnici = listUsersResult.users.map((userRecord) => ({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
    }));

    res.json(korisnici);
  } catch (error) {
    console.error("Greška pri listanju korisnika:", error);
    res.status(500).send("Interna server greška");
  }
});

const PORT = process.env["PORT"] || 3000;
app.listen(PORT, () => {
  console.log(`Server radi na portu ${PORT}`);
});
