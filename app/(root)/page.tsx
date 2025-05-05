import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import InterviewCard from '@/components/InterviewCard'
import { getCurrentUser} from '@/lib/actions/auth.action'
import { getInterviewsByUserId, getLatestInterviews } from '@/lib/actions/general.action'

const page = async() => {
  const user = await getCurrentUser();
  const [userInterviews,latestInterviews] = await Promise.all([
    await getInterviewsByUserId(user?.id!),
    await getLatestInterviews({userId : user?.id!})
  ])

  const hasPastInterviews = (userInterviews?.length ?? 0) > 0;
  const hasUpcomingInterviews = (latestInterviews?.length ?? 0) > 0;
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2 className="">
            Get Interview ready wiith AI-powered practice and feedback.
          </h2>
          <p>
            Practice on real interview questions and get instant feedback on your performance.
          </p>
          <Button asChild className='max-sm:w-full btn-primary'>
            <Link href="/interview">Start Interview Practice</Link>
          </Button>
        </div>
        <Image src="/robot.png" alt="robot" width={400} height={400} className="max-sm:hidden"/>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {
            hasPastInterviews?(
              userInterviews?.map((interview) => (
                <InterviewCard {...interview} key={interview.id}/>
              ))
            ):(
              <p>You haven&apos;t taken an Interview yet.</p>
            )
          }
        </div>
      </section>
      <section className="fles flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>
        <div className="interviews-section mt-4">
        {
            hasUpcomingInterviews?(
              latestInterviews?.map((interview) => (
                <InterviewCard {...interview} key={interview.id}/>
              ))
            ):(
              <p>There is no new Interview yet.</p>
            )
          }
        </div>
      </section>
    </>
  )
}
export default page