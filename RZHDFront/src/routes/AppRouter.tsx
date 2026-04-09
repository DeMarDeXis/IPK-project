import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage.tsx";
import ListDieselAndPrivateProductionPage from "../pages/Catalogue/CatalogueStaffAndOwnerStaff/PrivateAndDieselProds.tsx";
import MajorRepairPage from "../pages/Catalogue/MajorRepairListPage/MajorRepair.tsx";
import RepairHHPage from "../pages/Catalogue/RepairHubsAssembliesPage/RepairHAPage.tsx";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<MainPage />} />
                <Route path={"/catalog"} element={<ListDieselAndPrivateProductionPage />} />
                <Route path={"/caprep"} element={<MajorRepairPage />} />
                <Route path={"/repairhh"} element={<RepairHHPage />} />
            </Routes>
        </BrowserRouter>
    );
};


export default AppRouter;