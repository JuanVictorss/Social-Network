import React, { useState, useEffect } from "react";

const Show = ({ children, ifTrue }) => {
  if (ifTrue) return <>{children}</>;
};

export default Show;
