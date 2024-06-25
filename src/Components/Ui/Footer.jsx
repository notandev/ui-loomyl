import React from "react";
import LogoFoot from "../../Assets/Tak berjudul63_20240508003054.png";

function Footer() {
  return (
    <footer className="bg-footer pb-3 pt-28 flex flex-col items-center">
      <div className="w-full h-full  flex justify-center  ">
        <div className="w-[85%] h-full flex justify-center items-start">
          <div className="h-full w-1/3 flex flex-col justify-center items-center gap-y-3">
            <img src={LogoFoot} alt="logo" className="" />
            <p className="text-sm md:text-base">LOOMYL</p>
            <p className="text-xs md:text-base">"Peduli Ibu Hamil"</p>
            <div className="flex justify-center w-full gap-6">
              <ion-icon name="logo-facebook"></ion-icon>
              <ion-icon name="logo-twitter"></ion-icon>
              <ion-icon name="logo-instagram"></ion-icon>
              <ion-icon name="logo-linkedin"></ion-icon>
              <ion-icon name="logo-youtube"></ion-icon>
            </div>
          </div>
          <div className="h-full w-1/3 grid place-content-center text-left gap-y-3 px-10">
            <p className="text-sm md:text-base font-bold">Informasi</p>
            <p className="text-xs md:text-base">PT Kinema Systrans multimedia</p>
            <p className="text-xs md:text-base">
              Jl. Hang Lekiu, Sambau, Kecamatan Nongsa, Kota Batam, Kepulauan Riau
              29465
            </p>
            <p className="text-xs md:text-base">Tentang Kami</p>
            <p className="text-xs md:text-base">Bantuan</p>
          </div>
          <div className="h-full w-1/3 grid place-content-center text-left gap-y-3 px-10">
            <p className="font-bold text-sm md:text-base">Kontak Kami</p>

            <p className="flex items-center gap-x-3 text-xs md:text-base">
              <ion-icon name="mail-outline"></ion-icon> Labioulus@gmail.com
            </p>
            <p className="flex items-center gap-x-3 text-xs md:text-base">
              <ion-icon name="call-outline"></ion-icon> 081122334455
            </p>
          </div>
        </div>
      </div>
      <div className="h-1 w-11/12 py-10">
        <hr className="border-b border-indigo-100"/>
        <p className="pt-3 pb-10">©Loomyl, 2024 </p>
      </div>
    </footer>

  );
}

export default Footer;
