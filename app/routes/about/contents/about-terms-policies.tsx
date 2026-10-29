import { generateMeta } from '@/lib/generate-meta';

import { Text } from '@/components/helper/text';

import { AboutPrivacyPolicies } from '@/constants';

export function Meta() {
  generateMeta({
    title: 'Terms and Policies',
  });
}

export default function AboutTermsPoliciesOutlet() {
  return (
    <>
      <Text type="h6" weight="bold" className="w-full pb-3 text-center text-foreground">
        Terms and Policies
      </Text>
      <div className="scrollbar-none h-full w-full overflow-y-scroll">
        <ul className="list-inside list-disc py-3">
          {AboutPrivacyPolicies.map((item, index) => (
            <Text
              key={`privacy_policies_${index}`}
              type="p"
              weight="medium"
              className="pb-3 text-justify text-writing-dark dark:text-writing-light"
              lineHeight={6}
            >
              <li>{item}</li>
            </Text>
          ))}
        </ul>
      </div>
    </>
  );
}
