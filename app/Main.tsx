import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <ul className="grid grid-cols-1 gap-8 2xl:grid-cols-2 2xl:gap-12">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="group relative rounded-xl border border-gray-200 dark:border-gray-700 p-6 2xl:p-8 hover:shadow-lg transition-shadow">
                <article>
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                      <time dateTime={date} className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(date, siteMetadata.locale)}
                      </time>
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold leading-8 tracking-tight group-hover:text-primary-500 transition-colors">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-gray-900 dark:text-gray-100"
                        >
                          {title}
                        </Link>
                      </h2>
                      <div className="prose prose-sm max-w-none text-gray-500 dark:text-gray-400 line-clamp-3">
                        {summary}
                      </div>
                      <Link
                        href={`/blog/${slug}`}
                        className="absolute inset-0 z-0"
                        aria-label={`Read more: "${title}"`}
                      >
                        <span className="sr-only">Read more</span>
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="mt-12 flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="rounded-lg border border-primary-500 px-4 py-2 text-primary-500 transition-colors hover:bg-primary-500 hover:text-white dark:hover:text-white"
            aria-label="All posts"
          >
            查看全部文章 &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="mt-16 flex items-center justify-center border-t border-gray-200 pt-8 dark:border-gray-700">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
