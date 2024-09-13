/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProtectedRouteImport } from './routes/ProtectedRoute'
import { Route as PaginaErroImport } from './routes/PaginaErro'
import { Route as RolesIndexImport } from './routes/roles/index'
import { Route as ProgramacaoIndexImport } from './routes/programacao/index'
import { Route as OrcamentoIndexImport } from './routes/orcamento/index'
import { Route as OpsIndexImport } from './routes/ops/index'
import { Route as RolesAdicionarImport } from './routes/roles/adicionar'
import { Route as OpsResumoImport } from './routes/ops/resumo'
import { Route as OpsPdfImport } from './routes/ops/pdf'
import { Route as OpsFaturarImport } from './routes/ops/faturar'
import { Route as OpsEditarImport } from './routes/ops/editar'
import { Route as OpsAdicionarImport } from './routes/ops/adicionar'
import { Route as EstatisticasGanhoOpResumoImport } from './routes/estatisticas/GanhoOpResumo'
import { Route as AuthRegisterImport } from './routes/auth/register'
import { Route as AuthLogoutImport } from './routes/auth/logout'
import { Route as AuthLoginImport } from './routes/auth/login'
import { Route as OpsMapahorasIndexImport } from './routes/ops/mapahoras/index'
import { Route as RolesUserAdicionarImport } from './routes/roles/user/adicionar'
import { Route as OpsMapahorasAdicionarImport } from './routes/ops/mapahoras/adicionar'
import { Route as OpsItensAdicionarImport } from './routes/ops/itens/adicionar'
import { Route as OpsMapahorasEditarOpIdImport } from './routes/ops/mapahoras/editar.$opId'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const ProtectedRouteRoute = ProtectedRouteImport.update({
  path: '/ProtectedRoute',
  getParentRoute: () => rootRoute,
} as any)

const PaginaErroRoute = PaginaErroImport.update({
  path: '/PaginaErro',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const RolesIndexRoute = RolesIndexImport.update({
  path: '/roles/',
  getParentRoute: () => rootRoute,
} as any)

const ProgramacaoIndexRoute = ProgramacaoIndexImport.update({
  path: '/programacao/',
  getParentRoute: () => rootRoute,
} as any)

const OrcamentoIndexRoute = OrcamentoIndexImport.update({
  path: '/orcamento/',
  getParentRoute: () => rootRoute,
} as any)

const OpsIndexRoute = OpsIndexImport.update({
  path: '/ops/',
  getParentRoute: () => rootRoute,
} as any)

const RolesAdicionarRoute = RolesAdicionarImport.update({
  path: '/roles/adicionar',
  getParentRoute: () => rootRoute,
} as any)

const OpsResumoRoute = OpsResumoImport.update({
  path: '/ops/resumo',
  getParentRoute: () => rootRoute,
} as any)

const OpsPdfRoute = OpsPdfImport.update({
  path: '/ops/pdf',
  getParentRoute: () => rootRoute,
} as any)

const OpsFaturarRoute = OpsFaturarImport.update({
  path: '/ops/faturar',
  getParentRoute: () => rootRoute,
} as any)

const OpsEditarRoute = OpsEditarImport.update({
  path: '/ops/editar',
  getParentRoute: () => rootRoute,
} as any)

const OpsAdicionarRoute = OpsAdicionarImport.update({
  path: '/ops/adicionar',
  getParentRoute: () => rootRoute,
} as any)

const EstatisticasGanhoOpResumoRoute = EstatisticasGanhoOpResumoImport.update({
  path: '/estatisticas/GanhoOpResumo',
  getParentRoute: () => rootRoute,
} as any)

const AuthRegisterRoute = AuthRegisterImport.update({
  path: '/auth/register',
  getParentRoute: () => rootRoute,
} as any)

const AuthLogoutRoute = AuthLogoutImport.update({
  path: '/auth/logout',
  getParentRoute: () => rootRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  path: '/auth/login',
  getParentRoute: () => rootRoute,
} as any)

const OpsMapahorasIndexRoute = OpsMapahorasIndexImport.update({
  path: '/ops/mapahoras/',
  getParentRoute: () => rootRoute,
} as any)

const RolesUserAdicionarRoute = RolesUserAdicionarImport.update({
  path: '/roles/user/adicionar',
  getParentRoute: () => rootRoute,
} as any)

const OpsMapahorasAdicionarRoute = OpsMapahorasAdicionarImport.update({
  path: '/ops/mapahoras/adicionar',
  getParentRoute: () => rootRoute,
} as any)

const OpsItensAdicionarRoute = OpsItensAdicionarImport.update({
  path: '/ops/itens/adicionar',
  getParentRoute: () => rootRoute,
} as any)

const OpsMapahorasEditarOpIdRoute = OpsMapahorasEditarOpIdImport.update({
  path: '/ops/mapahoras/editar/$opId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/PaginaErro': {
      id: '/PaginaErro'
      path: '/PaginaErro'
      fullPath: '/PaginaErro'
      preLoaderRoute: typeof PaginaErroImport
      parentRoute: typeof rootRoute
    }
    '/ProtectedRoute': {
      id: '/ProtectedRoute'
      path: '/ProtectedRoute'
      fullPath: '/ProtectedRoute'
      preLoaderRoute: typeof ProtectedRouteImport
      parentRoute: typeof rootRoute
    }
    '/auth/login': {
      id: '/auth/login'
      path: '/auth/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof rootRoute
    }
    '/auth/logout': {
      id: '/auth/logout'
      path: '/auth/logout'
      fullPath: '/auth/logout'
      preLoaderRoute: typeof AuthLogoutImport
      parentRoute: typeof rootRoute
    }
    '/auth/register': {
      id: '/auth/register'
      path: '/auth/register'
      fullPath: '/auth/register'
      preLoaderRoute: typeof AuthRegisterImport
      parentRoute: typeof rootRoute
    }
    '/estatisticas/GanhoOpResumo': {
      id: '/estatisticas/GanhoOpResumo'
      path: '/estatisticas/GanhoOpResumo'
      fullPath: '/estatisticas/GanhoOpResumo'
      preLoaderRoute: typeof EstatisticasGanhoOpResumoImport
      parentRoute: typeof rootRoute
    }
    '/ops/adicionar': {
      id: '/ops/adicionar'
      path: '/ops/adicionar'
      fullPath: '/ops/adicionar'
      preLoaderRoute: typeof OpsAdicionarImport
      parentRoute: typeof rootRoute
    }
    '/ops/editar': {
      id: '/ops/editar'
      path: '/ops/editar'
      fullPath: '/ops/editar'
      preLoaderRoute: typeof OpsEditarImport
      parentRoute: typeof rootRoute
    }
    '/ops/faturar': {
      id: '/ops/faturar'
      path: '/ops/faturar'
      fullPath: '/ops/faturar'
      preLoaderRoute: typeof OpsFaturarImport
      parentRoute: typeof rootRoute
    }
    '/ops/pdf': {
      id: '/ops/pdf'
      path: '/ops/pdf'
      fullPath: '/ops/pdf'
      preLoaderRoute: typeof OpsPdfImport
      parentRoute: typeof rootRoute
    }
    '/ops/resumo': {
      id: '/ops/resumo'
      path: '/ops/resumo'
      fullPath: '/ops/resumo'
      preLoaderRoute: typeof OpsResumoImport
      parentRoute: typeof rootRoute
    }
    '/roles/adicionar': {
      id: '/roles/adicionar'
      path: '/roles/adicionar'
      fullPath: '/roles/adicionar'
      preLoaderRoute: typeof RolesAdicionarImport
      parentRoute: typeof rootRoute
    }
    '/ops/': {
      id: '/ops/'
      path: '/ops'
      fullPath: '/ops'
      preLoaderRoute: typeof OpsIndexImport
      parentRoute: typeof rootRoute
    }
    '/orcamento/': {
      id: '/orcamento/'
      path: '/orcamento'
      fullPath: '/orcamento'
      preLoaderRoute: typeof OrcamentoIndexImport
      parentRoute: typeof rootRoute
    }
    '/programacao/': {
      id: '/programacao/'
      path: '/programacao'
      fullPath: '/programacao'
      preLoaderRoute: typeof ProgramacaoIndexImport
      parentRoute: typeof rootRoute
    }
    '/roles/': {
      id: '/roles/'
      path: '/roles'
      fullPath: '/roles'
      preLoaderRoute: typeof RolesIndexImport
      parentRoute: typeof rootRoute
    }
    '/ops/itens/adicionar': {
      id: '/ops/itens/adicionar'
      path: '/ops/itens/adicionar'
      fullPath: '/ops/itens/adicionar'
      preLoaderRoute: typeof OpsItensAdicionarImport
      parentRoute: typeof rootRoute
    }
    '/ops/mapahoras/adicionar': {
      id: '/ops/mapahoras/adicionar'
      path: '/ops/mapahoras/adicionar'
      fullPath: '/ops/mapahoras/adicionar'
      preLoaderRoute: typeof OpsMapahorasAdicionarImport
      parentRoute: typeof rootRoute
    }
    '/roles/user/adicionar': {
      id: '/roles/user/adicionar'
      path: '/roles/user/adicionar'
      fullPath: '/roles/user/adicionar'
      preLoaderRoute: typeof RolesUserAdicionarImport
      parentRoute: typeof rootRoute
    }
    '/ops/mapahoras/': {
      id: '/ops/mapahoras/'
      path: '/ops/mapahoras'
      fullPath: '/ops/mapahoras'
      preLoaderRoute: typeof OpsMapahorasIndexImport
      parentRoute: typeof rootRoute
    }
    '/ops/mapahoras/editar/$opId': {
      id: '/ops/mapahoras/editar/$opId'
      path: '/ops/mapahoras/editar/$opId'
      fullPath: '/ops/mapahoras/editar/$opId'
      preLoaderRoute: typeof OpsMapahorasEditarOpIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/PaginaErro': typeof PaginaErroRoute
  '/ProtectedRoute': typeof ProtectedRouteRoute
  '/auth/login': typeof AuthLoginRoute
  '/auth/logout': typeof AuthLogoutRoute
  '/auth/register': typeof AuthRegisterRoute
  '/estatisticas/GanhoOpResumo': typeof EstatisticasGanhoOpResumoRoute
  '/ops/adicionar': typeof OpsAdicionarRoute
  '/ops/editar': typeof OpsEditarRoute
  '/ops/faturar': typeof OpsFaturarRoute
  '/ops/pdf': typeof OpsPdfRoute
  '/ops/resumo': typeof OpsResumoRoute
  '/roles/adicionar': typeof RolesAdicionarRoute
  '/ops': typeof OpsIndexRoute
  '/orcamento': typeof OrcamentoIndexRoute
  '/programacao': typeof ProgramacaoIndexRoute
  '/roles': typeof RolesIndexRoute
  '/ops/itens/adicionar': typeof OpsItensAdicionarRoute
  '/ops/mapahoras/adicionar': typeof OpsMapahorasAdicionarRoute
  '/roles/user/adicionar': typeof RolesUserAdicionarRoute
  '/ops/mapahoras': typeof OpsMapahorasIndexRoute
  '/ops/mapahoras/editar/$opId': typeof OpsMapahorasEditarOpIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/PaginaErro': typeof PaginaErroRoute
  '/ProtectedRoute': typeof ProtectedRouteRoute
  '/auth/login': typeof AuthLoginRoute
  '/auth/logout': typeof AuthLogoutRoute
  '/auth/register': typeof AuthRegisterRoute
  '/estatisticas/GanhoOpResumo': typeof EstatisticasGanhoOpResumoRoute
  '/ops/adicionar': typeof OpsAdicionarRoute
  '/ops/editar': typeof OpsEditarRoute
  '/ops/faturar': typeof OpsFaturarRoute
  '/ops/pdf': typeof OpsPdfRoute
  '/ops/resumo': typeof OpsResumoRoute
  '/roles/adicionar': typeof RolesAdicionarRoute
  '/ops': typeof OpsIndexRoute
  '/orcamento': typeof OrcamentoIndexRoute
  '/programacao': typeof ProgramacaoIndexRoute
  '/roles': typeof RolesIndexRoute
  '/ops/itens/adicionar': typeof OpsItensAdicionarRoute
  '/ops/mapahoras/adicionar': typeof OpsMapahorasAdicionarRoute
  '/roles/user/adicionar': typeof RolesUserAdicionarRoute
  '/ops/mapahoras': typeof OpsMapahorasIndexRoute
  '/ops/mapahoras/editar/$opId': typeof OpsMapahorasEditarOpIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/PaginaErro': typeof PaginaErroRoute
  '/ProtectedRoute': typeof ProtectedRouteRoute
  '/auth/login': typeof AuthLoginRoute
  '/auth/logout': typeof AuthLogoutRoute
  '/auth/register': typeof AuthRegisterRoute
  '/estatisticas/GanhoOpResumo': typeof EstatisticasGanhoOpResumoRoute
  '/ops/adicionar': typeof OpsAdicionarRoute
  '/ops/editar': typeof OpsEditarRoute
  '/ops/faturar': typeof OpsFaturarRoute
  '/ops/pdf': typeof OpsPdfRoute
  '/ops/resumo': typeof OpsResumoRoute
  '/roles/adicionar': typeof RolesAdicionarRoute
  '/ops/': typeof OpsIndexRoute
  '/orcamento/': typeof OrcamentoIndexRoute
  '/programacao/': typeof ProgramacaoIndexRoute
  '/roles/': typeof RolesIndexRoute
  '/ops/itens/adicionar': typeof OpsItensAdicionarRoute
  '/ops/mapahoras/adicionar': typeof OpsMapahorasAdicionarRoute
  '/roles/user/adicionar': typeof RolesUserAdicionarRoute
  '/ops/mapahoras/': typeof OpsMapahorasIndexRoute
  '/ops/mapahoras/editar/$opId': typeof OpsMapahorasEditarOpIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/PaginaErro'
    | '/ProtectedRoute'
    | '/auth/login'
    | '/auth/logout'
    | '/auth/register'
    | '/estatisticas/GanhoOpResumo'
    | '/ops/adicionar'
    | '/ops/editar'
    | '/ops/faturar'
    | '/ops/pdf'
    | '/ops/resumo'
    | '/roles/adicionar'
    | '/ops'
    | '/orcamento'
    | '/programacao'
    | '/roles'
    | '/ops/itens/adicionar'
    | '/ops/mapahoras/adicionar'
    | '/roles/user/adicionar'
    | '/ops/mapahoras'
    | '/ops/mapahoras/editar/$opId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/PaginaErro'
    | '/ProtectedRoute'
    | '/auth/login'
    | '/auth/logout'
    | '/auth/register'
    | '/estatisticas/GanhoOpResumo'
    | '/ops/adicionar'
    | '/ops/editar'
    | '/ops/faturar'
    | '/ops/pdf'
    | '/ops/resumo'
    | '/roles/adicionar'
    | '/ops'
    | '/orcamento'
    | '/programacao'
    | '/roles'
    | '/ops/itens/adicionar'
    | '/ops/mapahoras/adicionar'
    | '/roles/user/adicionar'
    | '/ops/mapahoras'
    | '/ops/mapahoras/editar/$opId'
  id:
    | '__root__'
    | '/'
    | '/PaginaErro'
    | '/ProtectedRoute'
    | '/auth/login'
    | '/auth/logout'
    | '/auth/register'
    | '/estatisticas/GanhoOpResumo'
    | '/ops/adicionar'
    | '/ops/editar'
    | '/ops/faturar'
    | '/ops/pdf'
    | '/ops/resumo'
    | '/roles/adicionar'
    | '/ops/'
    | '/orcamento/'
    | '/programacao/'
    | '/roles/'
    | '/ops/itens/adicionar'
    | '/ops/mapahoras/adicionar'
    | '/roles/user/adicionar'
    | '/ops/mapahoras/'
    | '/ops/mapahoras/editar/$opId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  PaginaErroRoute: typeof PaginaErroRoute
  ProtectedRouteRoute: typeof ProtectedRouteRoute
  AuthLoginRoute: typeof AuthLoginRoute
  AuthLogoutRoute: typeof AuthLogoutRoute
  AuthRegisterRoute: typeof AuthRegisterRoute
  EstatisticasGanhoOpResumoRoute: typeof EstatisticasGanhoOpResumoRoute
  OpsAdicionarRoute: typeof OpsAdicionarRoute
  OpsEditarRoute: typeof OpsEditarRoute
  OpsFaturarRoute: typeof OpsFaturarRoute
  OpsPdfRoute: typeof OpsPdfRoute
  OpsResumoRoute: typeof OpsResumoRoute
  RolesAdicionarRoute: typeof RolesAdicionarRoute
  OpsIndexRoute: typeof OpsIndexRoute
  OrcamentoIndexRoute: typeof OrcamentoIndexRoute
  ProgramacaoIndexRoute: typeof ProgramacaoIndexRoute
  RolesIndexRoute: typeof RolesIndexRoute
  OpsItensAdicionarRoute: typeof OpsItensAdicionarRoute
  OpsMapahorasAdicionarRoute: typeof OpsMapahorasAdicionarRoute
  RolesUserAdicionarRoute: typeof RolesUserAdicionarRoute
  OpsMapahorasIndexRoute: typeof OpsMapahorasIndexRoute
  OpsMapahorasEditarOpIdRoute: typeof OpsMapahorasEditarOpIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  PaginaErroRoute: PaginaErroRoute,
  ProtectedRouteRoute: ProtectedRouteRoute,
  AuthLoginRoute: AuthLoginRoute,
  AuthLogoutRoute: AuthLogoutRoute,
  AuthRegisterRoute: AuthRegisterRoute,
  EstatisticasGanhoOpResumoRoute: EstatisticasGanhoOpResumoRoute,
  OpsAdicionarRoute: OpsAdicionarRoute,
  OpsEditarRoute: OpsEditarRoute,
  OpsFaturarRoute: OpsFaturarRoute,
  OpsPdfRoute: OpsPdfRoute,
  OpsResumoRoute: OpsResumoRoute,
  RolesAdicionarRoute: RolesAdicionarRoute,
  OpsIndexRoute: OpsIndexRoute,
  OrcamentoIndexRoute: OrcamentoIndexRoute,
  ProgramacaoIndexRoute: ProgramacaoIndexRoute,
  RolesIndexRoute: RolesIndexRoute,
  OpsItensAdicionarRoute: OpsItensAdicionarRoute,
  OpsMapahorasAdicionarRoute: OpsMapahorasAdicionarRoute,
  RolesUserAdicionarRoute: RolesUserAdicionarRoute,
  OpsMapahorasIndexRoute: OpsMapahorasIndexRoute,
  OpsMapahorasEditarOpIdRoute: OpsMapahorasEditarOpIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/PaginaErro",
        "/ProtectedRoute",
        "/auth/login",
        "/auth/logout",
        "/auth/register",
        "/estatisticas/GanhoOpResumo",
        "/ops/adicionar",
        "/ops/editar",
        "/ops/faturar",
        "/ops/pdf",
        "/ops/resumo",
        "/roles/adicionar",
        "/ops/",
        "/orcamento/",
        "/programacao/",
        "/roles/",
        "/ops/itens/adicionar",
        "/ops/mapahoras/adicionar",
        "/roles/user/adicionar",
        "/ops/mapahoras/",
        "/ops/mapahoras/editar/$opId"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/PaginaErro": {
      "filePath": "PaginaErro.tsx"
    },
    "/ProtectedRoute": {
      "filePath": "ProtectedRoute.tsx"
    },
    "/auth/login": {
      "filePath": "auth/login.tsx"
    },
    "/auth/logout": {
      "filePath": "auth/logout.tsx"
    },
    "/auth/register": {
      "filePath": "auth/register.tsx"
    },
    "/estatisticas/GanhoOpResumo": {
      "filePath": "estatisticas/GanhoOpResumo.tsx"
    },
    "/ops/adicionar": {
      "filePath": "ops/adicionar.tsx"
    },
    "/ops/editar": {
      "filePath": "ops/editar.tsx"
    },
    "/ops/faturar": {
      "filePath": "ops/faturar.tsx"
    },
    "/ops/pdf": {
      "filePath": "ops/pdf.tsx"
    },
    "/ops/resumo": {
      "filePath": "ops/resumo.tsx"
    },
    "/roles/adicionar": {
      "filePath": "roles/adicionar.tsx"
    },
    "/ops/": {
      "filePath": "ops/index.tsx"
    },
    "/orcamento/": {
      "filePath": "orcamento/index.tsx"
    },
    "/programacao/": {
      "filePath": "programacao/index.tsx"
    },
    "/roles/": {
      "filePath": "roles/index.tsx"
    },
    "/ops/itens/adicionar": {
      "filePath": "ops/itens/adicionar.tsx"
    },
    "/ops/mapahoras/adicionar": {
      "filePath": "ops/mapahoras/adicionar.tsx"
    },
    "/roles/user/adicionar": {
      "filePath": "roles/user/adicionar.tsx"
    },
    "/ops/mapahoras/": {
      "filePath": "ops/mapahoras/index.tsx"
    },
    "/ops/mapahoras/editar/$opId": {
      "filePath": "ops/mapahoras/editar.$opId.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
