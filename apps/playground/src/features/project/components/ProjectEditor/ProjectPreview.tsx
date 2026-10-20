"use client"

import { useSelector } from "@tanstack/react-form"
import { ImageGridBlockView } from "@/features/project/components/BlockViews/ImageGridBlockView"
import { TextBlockView } from "@/features/project/components/BlockViews/TextBlockView"
import {
  type ProjectAuthor,
  ProjectHeader,
} from "@/features/project/components/ProjectHeader/ProjectHeader"
import { projectPageVariants } from "@/features/project/components/ProjectPage/ProjectPage.variants"
import {
  isEmptyBlock,
  type MediaLookup,
  projectFormOptions,
  toGridImages,
} from "@/features/project/editor/projectForm.options"
import { withForm } from "@/lib/form/useAppForm"
import { Slugs } from "@/lib/payload/slugs"

const { base, blocks } = projectPageVariants()

/**
 * The unsaved project as its page will show it, with no links, so nothing loads from the server
 */
export const ProjectPreview = withForm({
  ...projectFormOptions,
  props: {
    author: {} as ProjectAuthor,
    media: {} as MediaLookup,
  },
  render: function Render({ form, author, media }) {
    const { name, summary, pageContent, imageTitles } = useSelector(
      form.store,
      (state) => state.values,
    )

    return (
      <article className={base()}>
        <ProjectHeader project={{ name, summary, author }} removeAuthorLink />
        <div className={blocks()}>
          {/* Save skips empty blocks, so the page will not show them */}
          {pageContent
            .filter((block) => !isEmptyBlock(block))
            .map((block) =>
              block.blockType === Slugs.Blocks.TEXT ? (
                <TextBlockView content={block.content} key={block._key} />
              ) : (
                <ImageGridBlockView
                  images={toGridImages(block.images, media, imageTitles)}
                  key={block._key}
                />
              ),
            )}
        </div>
      </article>
    )
  },
})
