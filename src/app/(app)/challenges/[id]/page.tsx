import { CodeEditor } from "@/components/code-editor";
import { allChallenges } from "@/lib/data";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ChallengePage({ params }: { params: { id: string } }) {
  const challenge = allChallenges.find((c) => c.id === params.id);

  if (!challenge) {
    notFound();
  }
  
  const problemDescription = `
Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.

**Example 1:**
<pre><code class="font-code">Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
</code></pre>

**Example 2:**
<pre><code class="font-code">Input: nums = [3,2,4], target = 6
Output: [1,2]
</code></pre>

**Constraints:**
- \`2 <= nums.length <= 104\`
- \`-109 <= nums[i] <= 109\`
- \`-109 <= target <= 109\`
- **Only one valid answer exists.**
`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-100px)]">
      <div className="h-full overflow-y-auto pr-4">
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center justify-between">
                <CardTitle className="font-headline text-2xl">{challenge.title}</CardTitle>
                <Badge variant={
                  challenge.difficulty === 'Easy' ? 'secondary' :
                  challenge.difficulty === 'Medium' ? 'default' :
                  'destructive'
                }
                className={challenge.difficulty === 'Medium' ? 'bg-yellow-500 text-white' : ''}>
                {challenge.difficulty}
                </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: problemDescription }}>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="h-full">
        <CodeEditor challenge={challenge} problemDescription={problemDescription} />
      </div>
    </div>
  );
}
