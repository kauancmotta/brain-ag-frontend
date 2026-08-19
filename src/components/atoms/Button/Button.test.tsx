import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/atoms/Button'

describe('Button', () => {
  it('renderiza o texto do filho corretamente', () => {
    render(<Button>Salvar</Button>)
    expect(screen.getByText('Salvar')).toBeInTheDocument()
  })

  it('chama o onClick ao ser clicado', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Clique</Button>)
    fireEvent.click(screen.getByText('Clique'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('fica desabilitado quando disabled é true', () => {
    render(<Button disabled>Desabilitado</Button>)
    expect(screen.getByText('Desabilitado')).toBeDisabled()
  })

  it('fica desabilitado e exibe spinner quando isLoading é true', () => {
    render(<Button isLoading>Salvando</Button>)
    const button = screen.getByText('Salvando').closest('button')
    expect(button).toBeDisabled()
    expect(screen.getByLabelText('Carregando')).toBeDefined()
  })

  it('não dispara onClick quando desabilitado', () => {
    const handleClick = vi.fn()
    render(
      <Button disabled onClick={handleClick}>
        Ação
      </Button>
    )
    fireEvent.click(screen.getByText('Ação'))
    expect(handleClick).not.toHaveBeenCalled()
  })
})
