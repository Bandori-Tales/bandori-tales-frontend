import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router';

import { Text } from '@/components/helper/text';
import { Button } from '@/components/ui/button';

import { AboutFeedbackOptions, type FeedbackOptionProps } from '@/constants';

function FeedbackOptionSection({ title, buttonText, feedbackUrl, leftIcon }: FeedbackOptionProps) {
  const LeftIcon = leftIcon;

  return (
    <>
      <Text type="st2" weight="semibold" lineHeight={6} className="pt-6 pb-3 text-foreground">
        {title}
      </Text>
      <Button
        asChild
        variant="default"
        leftIcon={LeftIcon && <LeftIcon />}
        rightIcon={<ExternalLink />}
      >
        <Link to={feedbackUrl} target="_blank" rel="noopener noreferrer">
          {buttonText}
        </Link>
      </Button>
    </>
  );
}

export default function AboutFeedbackOutlet() {
  return (
    <>
      <Text type="h6" weight="bold" className="w-full pb-6 text-center text-foreground">
        Feedback and Report
      </Text>
      <Text
        type="p"
        weight="medium"
        lineHeight={6}
        className="pb-5 text-center text-writing-dark sm:text-left dark:text-writing-light"
      >
        Thank you for visiting Bandori-Tales Website. If you want to submit a feedback, send a
        comment or report a bug / error, you can visit one of the option below:
      </Text>
      {AboutFeedbackOptions.map((option) => {
        return <FeedbackOptionSection key={option.title} {...option} />;
      })}
    </>
  );
}
