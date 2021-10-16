import React from "react";
import { useState } from "react";
import ApartmentLogin from "./ApartmentLogin";
import ApartmentCreation from "./ApartmentCreation";

const ApartmentManagement = ({onFinish, aptKeys}) => {
  const [showCreate, setShowCreate] = useState(false);

  return showCreate ? (
      <ApartmentCreation onFinish={onFinish} aptKeys={aptKeys} setShowCreate={() => setShowCreate(false)}/>
    ) : (
      <ApartmentLogin onFinish={onFinish} aptKeys={aptKeys} setShowCreate={() => setShowCreate(true)}/>
    );
}

export default ApartmentManagement;