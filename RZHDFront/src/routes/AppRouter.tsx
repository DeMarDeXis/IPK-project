import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.tsx";
import MainPage from "../pages/MainPage/MainPage.tsx";
import CtlgStaffDieselPage from "../pages/ClgStaff/StaffDieselPage.tsx";
import CapRepairPage from "../pages/CapRepairPage/CapRepair.tsx";
import RepairHHPage from "../pages/RepairHubsHopsPage/RepairHH.tsx";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<MainPage />} />
                <Route path={"/catalog"} element={<CtlgStaffDieselPage />} />
                <Route path={"/caprep"} element={<CapRepairPage />} />
                <Route path={"/repairhh"} element={<RepairHHPage />} />

                <Route element={<ProtectedRoute />}>

                </Route>
            </Routes>
        </BrowserRouter>
    );
};


export default AppRouter;