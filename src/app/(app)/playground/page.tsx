import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ToyBrick, HelpCircle, Save, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const toolCategories = [
    { 
        name: 'API', 
        tools: ['Endpoint', 'Request', 'Response', 'Middleware']
    },
    {
        name: 'Database',
        tools: ['Query', 'Save', 'Find One', 'Find All']
    },
    {
        name: 'Authentication',
        tools: ['Sign Up', 'Sign In', 'Verify JWT', 'Middleware']
    },
    {
        name: 'Logic',
        tools: ['If/Else', 'Switch', 'Loop', 'Variable']
    }
];

export default function PlaygroundPage() {
    return (
        <div className="h-[calc(100vh-100px)] flex flex-col gap-4">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <ToyBrick className="w-10 h-10 text-primary" />
                    <div>
                        <h1 className="font-headline text-4xl font-bold">Interactive Playground</h1>
                        <p className="text-muted-foreground">
                        Drag, drop, and connect to build your backend logic.
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline"><HelpCircle className="mr-2"/>Help</Button>
                    <Button variant="outline"><Save className="mr-2"/>Save</Button>
                    <Button><Play className="mr-2"/>Run</Button>
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
                            {toolCategories.map(category => (
                                <div key={category.name}>
                                    <p className="font-semibold text-sm mb-2 px-2">{category.name}</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {category.tools.map(tool => (
                                            <div key={tool} className="p-2 border rounded-md text-center text-xs cursor-grab hover:bg-accent active:cursor-grabbing">
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
                <Card className="flex-grow">
                    <ScrollArea className="w-full h-full">
                        <div className="w-[2000px] h-[2000px] bg-secondary/30 relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-muted-foreground">
                                <p className="font-bold text-lg">Canvas</p>
                                <p>Drop nodes here to start building</p>
                            </div>
                        </div>
                        <ScrollBar orientation="horizontal" />
                        <ScrollBar orientation="vertical" />
                    </ScrollArea>
                </Card>
            </div>
        </div>
    )
}
