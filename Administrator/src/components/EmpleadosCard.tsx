import React, { useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParams } from "../navigator/EmpleadosNavigator";
import { CreateEmpleadoDto } from "../interfaces/empleadosInterface";

interface Props {
    empleado: CreateEmpleadoDto;
}



export const EmpleadosCard = ({ empleado }: Props) => {
    const widthDimension = Dimensions.get('window').width;
    
    const [isPressed, setIsPressed] = useState(false);

    type EmpleadosCardNavigationProp = StackNavigationProp<RootStackParams, 'Reportes'>;
    const navigation = useNavigation<EmpleadosCardNavigationProp>();

    const cardDynamicStyle = {
        transform: [{ scale: isPressed ? 0.96 : 1 }],
        shadowOpacity: isPressed ? 0 : 0.4,
        shadowRadius: isPressed ? 0 : 18,
        elevation: isPressed ? 0 : 12,
        borderColor: isPressed ? '#1D4ED8' : '#3B82F6',
    };

    return (
        <View style={style.cardOuterContainer}> 
            <TouchableOpacity
                onPress={() => navigation.navigate("Reportes", { empleado })}
                activeOpacity={1} 
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
            >
                <View
                    style={[
                        style.cardContainer, 
                        cardDynamicStyle, 
                        { width: widthDimension * 0.44 }
                    ]}
                >
                    <View style={style.accentFilter} /> 
                    
                    <View style={style.contentWrapper}>
                        
                        <View style={{ marginBottom: 15 }}>
                            <Text style={style.nombre}>
                                {empleado.nombre}
                            </Text>
                            <Text style={style.apellido}>
                                {empleado.apellido_p}
                            </Text>
                        </View>
                        
                        <View style={style.puestoWrapper}>
                             <Text style={style.puesto}>
                                {empleado.area}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    cardOuterContainer: {
        marginHorizontal: 8,
        marginBottom: 25,
    },
    cardContainer: {
        height: 180,
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: '#FFFFFF',

        borderWidth: 2,

        shadowColor: '#1D4ED8',
        shadowOffset: { width: 0, height: 8 },
    },
    accentFilter: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '40%',
        height: '40%',
        backgroundColor: '#3B82F6',
        borderBottomLeftRadius: 50,
        opacity: 0.1,
    },
    contentWrapper: {
        flex: 1,
        paddingHorizontal: 18,
        paddingVertical: 20,
        justifyContent: 'space-between',
        zIndex: 1,
    },
    nombre: {
        color: '#1D4ED8',
        fontSize: 19,
        fontWeight: "900",
        lineHeight: 22,
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 3,
    },
    apellido: {
        color: "#374151",
        fontSize: 15,
        fontWeight: "700",
        marginTop: 6,
    },
    puestoWrapper: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        backgroundColor: '#DBEAFE',
        borderWidth: 1,
        borderColor: '#3B82F6',
    },
    puesto: {
        color: '#1D4ED8',
        fontSize: 12,
        fontWeight: "800",
        textTransform: "uppercase",
        letterSpacing: 0.8,
    }
});
