import React, { useState } from "react";
import VendorList from "./VendorList";
import ShopProducts from "./ShopProducts";
// import "./ShopPage.css";

const ShopPage = () => {
  const [selectedShopId, setSelectedShopId] = useState(null);

  return (
    <div className="shop-page">
      <VendorList onSelectShop={setSelectedShopId} />
      {selectedShopId && <ShopProducts shopId={selectedShopId} />}
    </div>
  );
};

export default ShopPage;
