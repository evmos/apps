import Logo from "./images/Logo";

const Header = () => {
  return (
    <div className="h-[150px] text-white flex items-end justify-between">
      <a>
        <Logo />
      </a>
      <p>Assets Page</p>
      <button>Connect wallet</button>
    </div>
  );
};

export default Header;
