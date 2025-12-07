import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeEmpleados } from "../screens/HomeEmpleados";
import { ReportesNavigator } from "./ReportesNavigator";
import { ConfigureIpApi } from "../screens/ConfigureIpApi";
import { CreateEmpleadoDto } from '../interfaces/empleadosInterface';

export type RootStackParams = {
    HomeEmpleados: undefined;
    Reportes: { empleado: CreateEmpleadoDto };
    ConfigureIpApi: undefined;
}

export type RootDrawerParams = {
    HomeStack: undefined;
    ConfigureIpApi: undefined;
}

const HomeStack = () => {
    const Stack = createStackNavigator<RootStackParams>();
    
    return (
        <Stack.Navigator
            initialRouteName="HomeEmpleados"
            screenOptions={{
                headerMode: "float",
                headerShown: false, // <-- DESHABILITA EL HEADER DEL STACK POR DEFECTO
            }}
        >
            <Stack.Screen name="HomeEmpleados" component={ HomeEmpleados } />
            <Stack.Screen 
                name="Reportes" 
                component={({ route }: any) => <ReportesNavigator empleado={route.params.empleado} />}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export const EmpleadosNavigator = () => {
    const Drawer = createDrawerNavigator<RootDrawerParams>();
    
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false, // <-- DESHABILITA EL HEADER DEL DRAWER GLOBALMENTE
            }}
        >
            <Drawer.Screen 
                name="HomeStack" 
                component={HomeStack}
                options={{
                    title: "Empleados",
                    // El headerOptions es redundante si headerShown es false, pero lo quitamos
                }}
            />
            <Drawer.Screen 
                name="ConfigureIpApi" 
                component={ConfigureIpApi}
                options={{ 
                    title: "Configurar IP del API",
                    // Puedes reactivar el header del Drawer aquí si lo necesitas para esta pantalla
                    // headerShown: true,
                }}
            />
        </Drawer.Navigator>
    );
}