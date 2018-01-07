execute pathogen#infect()
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
syntax on
syntax enable

Plugin 'kchmck/vim-coffee-script'
Plugin 'mustache/vim-mustache-handlebars'
Plugin 'gmarik/Vundle.vim'
Plugin 'L9'
Plugin 'tomasr/molokai'
Plugin 'scrooloose/nerdtree'
Plugin 'tpope/vim-sensible'
Plugin 'tomtom/tcomment_vim'
Plugin 'ervandew/supertab'
Plugin 'Keithbsmiley/rspec.vim'
Plugin 'digitaltoad/vim-pug'

set background=dark
set number
set guifont='monaco'
set tabstop=2
set shiftwidth=2
set expandtab
set noswapfile
set splitbelow
set splitright

" Macvim Configs
if has("gui_running")
  set lines=150
  set columns=200
endif

if has('persistent_undo')
	silent !mkdir ~/.vim/backups > /dev/null 2>&1
	set undodir=~/.vim/backups
	set undofile
endif

map <leader>t :NERDTreeToggle<cr>
imap jj <Esc>
map <M-s> :w<kEnter>
imap <M-s> <Esc>:w<kEnter>i

set t_Co=256

au VimEnter *  NERDTree
autocmd FileType css set omnifunc=csscomplete#CompleteCSS

set hlsearch
autocmd BufWritePre * :%s/\s\+$//e

colorscheme molokai
call vundle#end()
filetype plugin indent on
