import type { Module } from "../services/types/authService.types";

export interface ModuleNode extends Module {
  children: ModuleNode[];
  level: number
}

export function formatModules(modules: Module[]): ModuleNode[] {
  // Crear un map de módulos para acceso rápido por path, se guardan en tuplas (path, módulo)
  const moduleMap = new Map<string, ModuleNode>();

  // Inicializar todos los nodos con array vacío en children donde irán los submódulos
  modules.forEach(module => {
    moduleMap.set(module.path, {
      ...module,
      children: [],
      level: module.path.split('.').length - 1
    });
  });
  
  // Array para los nodos raíz (primer nivel de modulos en la jerarquía)
  const rootNodes: ModuleNode[] = [];
  
  // Construir el árbol
  modules.forEach(module => {
    const pathParts = module.path.split('.');
    const currentNode = moduleMap.get(module.path)!;
    
    if (pathParts.length === 1) {
      // Si el path tiene una sola parte, agregarlo como raíz
      rootNodes.push(currentNode);
    } else {
      // Encontrar el padre (eliminando el último segmento del path)
      const parentPath = pathParts.slice(0, -1).join('.');
      const parentNode = moduleMap.get(parentPath); // Buscar el padre en el map moduleMap
      
      if (parentNode) {
        // Si tiene nodo padre, se agrega como hijo
        parentNode.children.push(currentNode);
      } else {
        // Si no existe el padre, agregar como raíz
        rootNodes.push(currentNode);
      }
    }
  });
  
  // Ordenamiento recursivo
  const sortTree = (nodes: ModuleNode[]) => {
    nodes.sort((a, b) => a.path.localeCompare(b.path));
    nodes.forEach(node => {
      if (node.children.length > 0) {
        sortTree(node.children);
      }
    });
  };
  
  sortTree(rootNodes);
  
  return rootNodes;
}