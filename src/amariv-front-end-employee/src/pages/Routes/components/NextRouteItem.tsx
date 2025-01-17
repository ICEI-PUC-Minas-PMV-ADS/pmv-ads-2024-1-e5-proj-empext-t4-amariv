import React from "react";
import IcHandle from './../assets/ic_handle.svg';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Gathering } from "src/models/Gathering";

/**
 * NextRouteItemProps
 */
export type NextRouteItemProps = {
  route: Gathering,
  position: number,
};


/**
 * NextRouteItem
 */

export function NextRouteItem({ route, position }: NextRouteItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition
  } = useSortable({ id: route.id });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition
  };

  /**
   * Layout
   */

  return (
    <div ref={setNodeRef} className="w-full bg-[#E8F4EB] py-2 border-b border-[#00000040]" style={style}>
      <div className="flex flex-row justify-center items-center" >
        <div className="text-2xl pe-4 font-bold">{position}º</div>
        <div className="flex-1">
          <div className="h-[2rem] flex items-end">
            <p className="text-sm line-clamp-2">
              {route.endereco.logradouro}
            </p>
          </div>
          <div className="h-[3rem] flex items-start">
            <p className="line-clamp-2">
              <strong>Materiais:</strong> {route.listaItensColeta}
            </p>
          </div>
        </div>
        <div className="flex px-4 py-3" ref={setActivatorNodeRef} {...attributes} {...listeners}>
          <img src={IcHandle} alt="Handle icon" style={{ width: 25, height: 30 }} />
        </div>
      </div>
    </div>
  );
}