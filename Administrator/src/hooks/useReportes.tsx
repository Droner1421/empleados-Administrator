import { useState, useContext } from "react";
import { empleadosApi } from "../api/empleadosApi";
import { ApiConfigContext } from "../context/ApiConfigContext";
import {
    ReporteAsistencia,
    AsistenciaEmpleado,
    Nomina,
    DiasTrabajados,
    ReporteProduccion,
    HorasTrabajadas,
    UnidadesProducidas,
} from "../interfaces/empleadosInterface";

export const useReporteAsistencia = () => {
    const [data, setData] = useState<ReporteAsistencia | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { apiIP } = useContext(ApiConfigContext);

    const loadData = async (id_empleado: number, fechaInicio: string, fechaFin: string) => {
        setIsLoading(true);
        const BASE_URL = `${apiIP}/api/dsm44/empleados`;
        const response = await empleadosApi.get<ReporteAsistencia>(
            `${BASE_URL}/reporte-asistencia-empleado?id_empleado=${id_empleado}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        );
        setData(response.data);
        setIsLoading(false);
    };

    return { data, isLoading, loadData };
};

export const useAsistenciaEmpleado = () => {
    const [data, setData] = useState<AsistenciaEmpleado | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { apiIP } = useContext(ApiConfigContext);

    const loadData = async (id_empleado: number, fechaInicio: string, fechaFin: string) => {
        setIsLoading(true);
        const BASE_URL = `${apiIP}/api/dsm44/empleados`;
        const response = await empleadosApi.get<AsistenciaEmpleado>(
            `${BASE_URL}/asistencia-empleado?id_empleado=${id_empleado}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        );
        setData(response.data);
        setIsLoading(false);
    };

    return { data, isLoading, loadData };
};

export const useNomina = () => {
    const [data, setData] = useState<Nomina | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { apiIP } = useContext(ApiConfigContext);

    const loadData = async (id_empleado: number, fechaInicio: string, fechaFin: string) => {
        setIsLoading(true);
        const BASE_URL = `${apiIP}/api/dsm44/empleados`;
        const response = await empleadosApi.get<Nomina>(
            `${BASE_URL}/nomina?id_empleado=${id_empleado}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        );
        setData(response.data);
        setIsLoading(false);
    };

    return { data, isLoading, loadData };
};

export const useDiasTrabajados = () => {
    const [data, setData] = useState<DiasTrabajados[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { apiIP } = useContext(ApiConfigContext);

    const loadData = async (id_empleado: number, fechaInicio: string, fechaFin: string) => {
        setIsLoading(true);
        const BASE_URL = `${apiIP}/api/dsm44/empleados`;
        const response = await empleadosApi.get<DiasTrabajados[]>(
            `${BASE_URL}/dias-trabajados?id_empleado=${id_empleado}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        );
        setData(response.data);
        setIsLoading(false);
    };

    return { data, isLoading, loadData };
};

export const useReporteProduccion = () => {
    const [data, setData] = useState<ReporteProduccion[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { apiIP } = useContext(ApiConfigContext);

    const loadData = async (id_empleado: number, fechaInicio: string, fechaFin: string) => {
        setIsLoading(true);
        const BASE_URL = `${apiIP}/api/dsm44/empleados`;
        const response = await empleadosApi.get<ReporteProduccion[]>(
            `${BASE_URL}/reporte-produccion?id_empleado=${id_empleado}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        );
        setData(response.data);
        setIsLoading(false);
    };

    return { data, isLoading, loadData };
};

export const useHorasTrabajadas = () => {
    const [data, setData] = useState<HorasTrabajadas[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { apiIP } = useContext(ApiConfigContext);

    const loadData = async (id_empleado: number, fechaInicio: string, fechaFin: string) => {
        setIsLoading(true);
        const BASE_URL = `${apiIP}/api/dsm44/empleados`;
        const response = await empleadosApi.get<HorasTrabajadas[]>(
            `${BASE_URL}/horas-trabajadas?id_empleado=${id_empleado}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        );
        setData(response.data);
        setIsLoading(false);
    };

    return { data, isLoading, loadData };
};

export const useUnidadesProducidas = () => {
    const [data, setData] = useState<UnidadesProducidas | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { apiIP } = useContext(ApiConfigContext);

    const loadData = async (id_empleado: number, fechaInicio: string, fechaFin: string) => {
        setIsLoading(true);
        const BASE_URL = `${apiIP}/api/dsm44/empleados`;
        const response = await empleadosApi.get<UnidadesProducidas>(
            `${BASE_URL}/unidades-producidas?id_empleado=${id_empleado}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        );
        setData(response.data);
        setIsLoading(false);
    };

    return { data, isLoading, loadData };
};
