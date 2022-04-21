import React from "react";
import { Outlet } from "react-router-dom";

export default function Banner() {
  /* Will contain dashboard, header, settings 
    or any function relating to banners */
  return (
    <>
      <Outlet />
    </>
  );
}
