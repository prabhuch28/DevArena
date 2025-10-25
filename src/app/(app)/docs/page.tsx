import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import Link from 'next/link';

const docSections = [
    {
        title: 'Getting Started',
        description: 'An introduction to Devareana and its core features.',
        href: '/docs/getting-started'
    },
    {
        title: 'API Endpoints',
        description: 'Learn how to construct and visualize API routes.',
        href: '/docs/api-endpoints'
    },
    {
        title: 'Database Operations',
        description: 'Understand how database nodes work in the playground.',
        href: '/docs/database-operations'
    },
    {
        title: 'Authentication',
        description: 'Guides on using authentication nodes like JWT and OAuth.',
        href: '/docs/authentication'
    },
    {
        title: 'AI-Powered Tools',
        description: 'Harness the power of the Concept Simplifier and Code Story Generator.',
        href: '/docs/ai-tools'
    },
    {
        title: 'Deployment',
        description: 'Learn how to export and deploy your visual logic.',
        href: '/docs/deployment'
    }
]

export default function DocsPage() {
  return (
    <div className="container mx-auto py-8">
        <div className="flex items-center gap-4 mb-8">
            <BookOpen className="w-10 h-10 text-primary" />
            <div>
                <h1 className="font-headline text-4xl font-bold">Documentation</h1>
                <p className="text-muted-foreground">
                    Your comprehensive guide to mastering Devareana.
                </p>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {docSections.map((section) => (
                <Link href={section.href} key={section.title}>
                    <Card className="h-full hover:border-primary transition-colors">
                        <CardHeader>
                            <CardTitle className="font-headline">{section.title}</CardTitle>
                            <CardDescription>{section.description}</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            ))}
        </div>
    </div>
  );
}
