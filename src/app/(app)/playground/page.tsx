'use client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { ToyBrick, HelpCircle, Save, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Background,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';

const toolCategories = [
  {
    name: 'Client',
    tools: ['Browser', 'Mobile App', 'User', 'Device'],
  },
  {
    name: 'API',
    tools: ['API Gateway', 'Endpoint', 'Request', 'Response'],
  },
  {
    name: 'Services',
    tools: ['Microservice', 'Lambda', 'Worker', 'Auth Service'],
  },
  {
    name: 'Database',
    tools: ['SQL Database', 'NoSQL DB', 'Data Warehouse', 'Replication'],
  },
  {
    name: 'Caching',
    tools: ['Cache', 'Redis', 'CDN', 'Invalidate'],
  },
  {
    name: 'Messaging',
    tools: ['Message Queue', 'Pub/Sub', 'Event Bus', 'Webhook'],
  },
  {
    name: 'Authentication',
    tools: ['Sign Up', 'Sign In', 'Verify JWT', 'OAuth 2.0'],
  },
  {
    name: 'Logic',
    tools: ['If/Else', 'Switch', 'Loop', 'Variable'],
  },
];

let id = 0;
const getId = () => `dnd-node_${id++}`;

export default function PlaygroundPage() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) {
        return;
      }
      
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode: Node = {
        id: getId(),
        type: 'default',
        position,
        data: { label: `${type}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ToyBrick className="w-10 h-10 text-primary" />
          <div>
            <h1 className="font-headline text-4xl font-bold">
              Interactive Playground
            </h1>
            <p className="text-muted-foreground">
              Drag, drop, and connect to build your backend logic.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <HelpCircle className="mr-2" />
            Help
          </Button>
          <Button variant="outline">
            <Save className="mr-2" />
            Save
          </Button>
          <Button>
            <Play className="mr-2" />
            Run
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-[250px_1fr] gap-4 flex-grow min-h-0">
        {/* Toolbox */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Toolbox</CardTitle>
            <CardDescription>Drag nodes to the canvas</CardDescription>
          </CardHeader>
          <ScrollArea className="flex-grow">
            <CardContent className="space-y-4">
              {toolCategories.map((category) => (
                <div key={category.name}>
                  <p className="font-semibold text-sm mb-2 px-2">
                    {category.name}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {category.tools.map((tool) => (
                      <div
                        key={tool}
                        className="p-2 border rounded-md text-center text-xs cursor-grab hover:bg-accent active:cursor-grabbing"
                        onDragStart={(event) => onDragStart(event, tool)}
                        draggable
                      >
                        {tool}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </ScrollArea>
        </Card>

        {/* Canvas */}
        <Card className="flex-grow" ref={reactFlowWrapper}>
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
            <Background />
            <Controls />
          </ReactFlow>
        </Card>
      </div>
    </div>
  );
}
