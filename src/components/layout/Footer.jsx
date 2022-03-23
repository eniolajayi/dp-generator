export default function Footer() {
  const getCurrentYear = () => {
    let date = new Date();
    return date.getFullYear();
  };
  return (
    <footer>
      <span>copyright(c){getCurrentYear()}. all rights reserved</span>
    </footer>
  );
}
