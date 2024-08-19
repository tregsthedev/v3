import { Input, Label, Text, Flex, Box, Grid } from 'theme-ui'
import ProjectView from './project-view'
import useForm from '../../../lib/use-form'
import Submit from '../../submit'
import { useState } from 'react'
import Icon from '@hackclub/icons'
// import FileInput from '../../../pages/api/arcade/showcase/projects/[projectID]/file-input'
/** @jsxImportSource theme-ui */

const ProjectEditForm = ({ project }) => {
  // const [previewProject, setPreviewProject] = useState(project)
  const [screenshot, setScreenshot] = useState(project.screenshot)
  const [newScreenshot, setNewScreenshot] = useState('')

  const [video, setVideo] = useState(project.video)
  const [newVideo, setNewVideo] = useState('')

  function publishedChanges(e) {
    console.log('published changes', e)
  }
  const { status, formProps, useField, data } = useForm(
    `/api/arcade/showcase/projects/${project.id}/edit/`,
    publishedChanges,
    {
      method: 'PATCH',
      initData: { ...project, recordId: project.id },
      bearer: window.localStorage.getItem('arcade.authToken'),
      clearOnSubmit: null
    }
  )

  const updateScreenshot = newMedia => {
    if (screenshot.some(item => item === newMedia)) {
      alert('This media already exists and cannot be added.')
      return
    }
    setScreenshot(screenshot => [...screenshot, newMedia])
  }

  const deleteScreenshot = deletedMedia => {
    setScreenshot(screenshot.filter(item => !item.includes(deletedMedia)))
  }

  const updateNewScreenshot = e => {
    setNewScreenshot(e.target.value)
  }

  const updateVideo = newMedia => {
    if (video.some(item => item === newMedia)) {
      alert('This media already exists and cannot be added.')
      return
    }
    setVideo(video => [...video, newMedia])
  }

  const deleteVideo = deletedMedia => {
    setVideo(video.filter(item => !item.includes(deletedMedia)))
  }

  const updateNewVideo = e => {
    setNewVideo(e.target.value)
  }

  const previewProject = {
    ...data
  }

  return (
    <Box
      sx={{
        width: '90vw',
        maxWidth: '1200px',
        margin: 'auto',
        position: 'relative',
        my: 5
      }}
    >
      <Text
        variant="subtitle"
        className="slackey"
        as="h3"
        sx={{
          textAlign: 'center',
          display: 'flex',
          width: '100%',
          mb: 2,
          color: '#333'
        }}
      >
        <Icon glyph="edit" />
        Editing {project.title} details
      </Text>
      <Text
        as="a"
        href="/arcade/showcase/my"
        sx={{
          border: '2px dashed #333',
          borderRadius: '5px',
          position: ['relative', 'relative', 'absolute'],
          display: 'flex',
          right: 0,
          top: 0,
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
          py: 1,
          transitionDuration: '0.4s',
          cursor: 'pointer',
          textDecoration: 'none',
          mb: 3,
          '&:hover': {
            background: '#333',
            color: '#f8e4c4'
          }
        }}
      >
        <Icon glyph="home" /> View all my ships
      </Text>
      <Grid
        className="gaegu"
        sx={{
          backgroundColor: '#F4E7C7',
          p: 4,
          borderRadius: '10px',
          gridTemplateColumns: ['1fr', '1fr 2fr']
        }}
      >
        <form {...formProps}>
          <Label>
            <Text>Project name</Text>
            <Input
              {...useField('title')}
              placeholder="Arcade"
              sx={{ border: '1px dashed', borderColor: '#09AFB4', mb: 2 }}
            />
          </Label>
          <Label>
            <Text>ReadMe Link</Text>
            <Input
              {...useField('readMeLink')}
              placeholder="https://github.com/hackclub/arcade/README.md"
              sx={{ border: '1px dashed', borderColor: '#09AFB4', mb: 2 }}
            />
          </Label>
          <Label>
            <Text>Repo Link</Text>
            <Input
              {...useField('codeLink')}
              placeholder="https://github.com/hackclub/arcade"
              sx={{ border: '1px dashed', borderColor: '#09AFB4', mb: 2 }}
            />
          </Label>
          <Label>
            <Text>Play Link</Text>
            <Input
              {...useField('playLink')}
              placeholder="https://hackclub.com/arcade"
              sx={{ border: '1px dashed', borderColor: '#09AFB4', mb: 2 }}
            />
          </Label>

          <Label>
            <Text>Screenshot link</Text>
            <Text variant="caption">
              Demo your work! No hosted link? Try{' '}
              <a href="https://hackclub.slack.com/archives/C016DEDUL87" target="_blank">#cdn</a>{' '}
              or <a href="https://tmpfiles.org/?upload" target="_blank">tmpfiles</a>
            </Text>
            <Input
              {...useField('screenshot')}
              type="url"
              sx={{ border: '1px dashed', borderColor: '#09AFB4', mb: 2 }}
            />
          </Label>
          <Label>
            <Text>Video link</Text>
            <Text variant="caption">
              Add a link to your demo video! Need a host? Try{' '}
              <a href="https://hackclub.slack.com/archives/C016DEDUL87" target="_blank">#cdn</a>{' '}
              or <a href="https://tmpfiles.org/?upload" target="_blank">tmpfiles</a>
            </Text>
            <Input
              {...useField('video')}
              type="url"
              sx={{ border: '1px dashed', borderColor: '#09AFB4', mb: 2 }}
            />
          </Label>

          <Label>
            <Text>Background Color</Text>
            <Input
              {...useField('color')}
              type="color"
              // value={color}
              // onChange={handleColorChange}
              sx={{
                width: '150px',
                height: '50px',
                padding: '0',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                zIndex: 1,
                position: 'relative'
              }}
            />
          </Label>
          <Label>
            <Text>Text Color</Text>
            <Input
              {...useField('textColor')}
              type="color"
              sx={{
                width: '150px',
                height: '50px',
                padding: '0',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                zIndex: 1,
                position: 'relative'
              }}
            />
          </Label>
          <Input {...useField('authToken')} type="hidden" />

          <Submit
            status={status}
            labels={{
              default: 'Publish changes',
              error: 'Something went wrong',
              success: 'Updated!'
            }}
            sx={{
              borderRadius: '10px'
            }}
          />
        </form>
        <Box
          sx={{
            // backgroundColor: color,
            border: '2px dashed #09AFB4',
            borderRadius: '5px'
          }}
        >
          <ProjectView {...previewProject} />
        </Box>
      </Grid>
    </Box>
  )
}

export default ProjectEditForm
