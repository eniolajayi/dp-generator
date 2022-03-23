import Button from "../components/button/Button";
export default function Home() {
  return (
    <main>
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "600",
          width: "min(30ch,100%)",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        Create your own personalized dp banner with ease
      </h1>
      <Button>Get Started</Button>
    </main>
  );
}
