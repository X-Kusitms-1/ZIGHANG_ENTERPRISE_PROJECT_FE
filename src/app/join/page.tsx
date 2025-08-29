import LoginFooter from "../../components/join/LoginFooter";
import LoginSocialList from "../../components/join/LoginSocialList";
import LoginSubTitle from "../../components/join/LoginSubTitle";
import LoginTitle from "../../components/join/LoginTitle";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="tablet:px-10 tablet:max-w-screen-lg tablet:mx-auto relative w-full overflow-visible">
        <section className="tablet:gap-[50px] flex h-screen w-full flex-col items-center justify-center gap-10">
          <div className="flex flex-col items-center gap-5">
            <LoginTitle/>
            <LoginSubTitle/>
          </div>
          <LoginSocialList/>
          <LoginFooter/> 
        </section>
      </div>
    </main>
  );
}
