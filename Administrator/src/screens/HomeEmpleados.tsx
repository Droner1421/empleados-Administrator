import React from "react";
import { View, StyleSheet, FlatList, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useEmpleados } from "../hooks/useEmpleados";
import { EmpleadosCard } from "../components/EmpleadosCard";
import { DrawerNavigationProp } from "@react-navigation/drawer";

type HomeEmpleadosNavigationProp = DrawerNavigationProp<any, 'HomeStack'>;

interface HomeEmpleadosProps {
    navigation: HomeEmpleadosNavigationProp;
}



export const HomeEmpleados = ({ navigation }: HomeEmpleadosProps) => {
    const { empleados, isLoading, LoadEmpleados } = useEmpleados();

    const ListHeader = () => (
        <View style={style.headerContainer}>
            
            <View style={style.headerTopBar}>
                <TouchableOpacity
                    style={style.menuButton}
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Text style={style.menuButtonText}>☰</Text>
                </TouchableOpacity>

              
            </View>
            
            <Text style={style.titulo}>
                Directorio de Personal
            </Text>
            <Text style={style.subTitulo}>
                Información y Reportes
            </Text>
        </View>
    );

    return (
        <View style={ style.root }>
            <FlatList
                data={ empleados }
                keyExtractor={ (empleado, index) => `${empleado.id_empleado}${index}` }
                
                ListHeaderComponent={ ListHeader }
                
                showsVerticalScrollIndicator={false}
                numColumns={2}
                columnWrapperStyle={style.columnWrapper}
                
                renderItem={ ({item}) => (
                    <EmpleadosCard empleado={item} />
                )}
                
                onEndReached={ LoadEmpleados }
                onEndReachedThreshold={ 0.2 }
                
                ListFooterComponent={(
                    isLoading && (
                        <ActivityIndicator
                            style={style.loadingIndicator}
                            size={ 50 }
                            color='#3B82F6'
                        />
                    )
                )}
            />
        </View>
    );
}

const style = StyleSheet.create({
    root:{
        flex:1,
        backgroundColor: '#F9FAFB',
    },
    headerContainer: {
        paddingTop: 30,
        paddingBottom: 12,
        paddingHorizontal: 20,
        backgroundColor: '#1D4ED8',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
        marginBottom: 15,
    },
    headerTopBar: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 8,
    },
    titulo: {
        fontSize: 26,
        fontWeight: '800',
        color: '#FFFFFF',
        textAlign: 'left',
        letterSpacing: 0.5,
        marginBottom: 1,
    },
    subTitulo: {
        fontSize: 14,
        fontWeight: '500',
        color: 'rgba(255, 255, 255, 0.75)',
        textAlign: 'left',
    },
    menuButton: {
        padding: 5,
    },
    menuButtonText: {
        fontSize: 28,
        color: '#FFFFFF',
        lineHeight: 28,
        height: 28,
        transform: [{ translateY: -3 }] 
    },
    searchButton: {
        padding: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 10,
    },
    searchButtonText: {
        fontSize: 20, 
        color: '#FFFFFF',
        lineHeight: 24,
        height: 24,
    },
    columnWrapper: {
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    loadingIndicator: {
        height: 100, 
        marginTop: 20,
    }
});
