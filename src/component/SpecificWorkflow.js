import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";

import Sidebar from "./SideBar";
import { useLoaderData } from "react-router-dom";
const initialNodes = [
  {
    id: "1",
    type: "input",
    data: {
      label: (
        <div className="flex flex-1 justify-between items-center border rounded">
          <span className="flex-none px-1 font-bold ">A</span>
          <input
            type="text"
            disabled
            placeholder="Enter text here"
            className="flex-1 w-full bg-green-100 text-center focus:outline-none px-1"
          />
          <span className="flex-none px-1 font-bold">A</span>
        </div>
      ),
    },
    position: { x: 250, y: 5 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const SpecificWorkflow = () => {
  const specificData = useLoaderData();
  const { name } = specificData;

  const [workFlow, setWorkFlow] = useState([]);

  const handleInputDataChange = (data) => {
    setWorkFlow(data);
  };

  const reactFlowWrapper = useRef(null);
  const edgeUpdateSuccessful = useRef(true);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: {
          label: (
            <div className="flex flex-1 justify-between items-center border rounded">
              <span className="flex-none px-2 font-bold ">
                {workFlow.input_type}
              </span>
              <input
                type="text"
                disabled
                placeholder={workFlow.name}
                className="flex-1 w-full px-1 bg-green-100 text-center focus:outline-none"
              />
              <span className="flex-none px-1 font-bold">
                {workFlow.output_type}
              </span>
            </div>
          ),
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [
      reactFlowInstance,
      setNodes,
      workFlow.input_type,
      workFlow.name,
      workFlow.output_type,
    ]
  );

  return (
    <div>
      <h1 className="text-xl font-bold shadow-lg p-4">WorkFlow name: {name}</h1>
      <div className="dndflow">
        <ReactFlowProvider>
          <Sidebar handleInputDataChange={handleInputDataChange} />
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              fitView
            >
              <Background variant="dots" gap={12} size={1} />
              <Controls />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default SpecificWorkflow;
